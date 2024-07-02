<?php

namespace App\Api;

use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\Filesystem\Path;

class JsonDB
{
    private $path;

    public function __construct($rootDir, private Filesystem $filesystem)
    {
        $this->path = Path::join($rootDir, "db", "v1");
    }

    public function get($endpoint, $id, $query)
    {
        $endpoint = $endpoint . ".json";
        $filename = Path::join($this->path,  $endpoint);
        if (!$this->filesystem->exists($filename)) {
            $this->filesystem->appendToFile($filename, "");
        }

        $json = $this->filesystem->readFile($filename);
        return  json_decode($json);
    }

    public function save($endpoint, $body)
    {
        $endpoint = $endpoint . ".json";
        $filename = Path::join($this->path,  $endpoint);
        if (!$this->filesystem->exists($filename)) {
            $this->filesystem->appendToFile($filename, "");
        }

        $json = $this->filesystem->readFile($filename);
        $data = json_decode($json, true);

        $body["id"] = hash("md5", time());

        $data[] = $body;
        $json = json_encode($data);
        $this->filesystem->dumpFile($filename, $json);
        return $body;
    }

    public function update($endpoint, $id, $body)
    {
        $endpoint = $endpoint . ".json";
        $filename = Path::join($this->path,  $endpoint);
        if (!$this->filesystem->exists($filename)) {
            $this->filesystem->appendToFile($filename, "");
        }

        $json = $this->filesystem->readFile($filename);
        $data = json_decode($json, true);

        foreach ($data as &$row) {
            if ($row["id"] == $id) {
                $row = $body;
            }
        }

        $json = json_encode($data);
        $this->filesystem->dumpFile($filename, $json);

        return $body;
    }

    public function delete($endpoint, $id, $body)
    {
        $endpoint = $endpoint . ".json";
        $filename = Path::join($this->path,  $endpoint);
        if (!$this->filesystem->exists($filename)) {
            $this->filesystem->appendToFile($filename, "");
        }

        $json = $this->filesystem->readFile($filename);
        $data = json_decode($json, true);

        $newData = [];
        foreach ($data as $row) {
            if ($row["id"] != $id) {
                $newData[] = $row;
            }
        }

        $json = json_encode($newData);
        $this->filesystem->dumpFile($filename, $json);

        return $body;
    }
}
