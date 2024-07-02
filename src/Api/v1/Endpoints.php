<?php

namespace App\Api\v1;

use App\Api\JsonDB;
use Symfony\Component\Filesystem\Path;

class Endpoints
{
    private $endpoints = [];

    public function __construct(private JsonDB $jsonDB)
    {

        //$rootDir = $this->getParameter('kernel.project_dir');

        /*
        TODO inject endpoit classes and assing to $this->endpoints
        Later iterate all endpint class and check if they have defined endpint name
        */
    }

    public function handle($endpoint, $method, $id, $body, $query)
    {
        /*foreach ($this->endpoints as $endpoint) {
            if ($endpoint) {
            }
        }*/

        //return $this->{$endpoint}($method, $id, $body, $query);

        switch ($method) {
            case "GET": {
                    return $this->jsonDB->get($endpoint, $id, $query);
                }
            case "POST": {
                    return $this->jsonDB->save($endpoint, $body);
                }
            case "PUT": {
                    return $this->jsonDB->update($endpoint, $id, $body);
                }
            case "DELETE": {
                    return $this->jsonDB->delete($endpoint, $id, $body);
                }
        }
    }

    /*private function projects($method, $id, $body, $query)
    {
        switch ($method) {
            case "GET": {
                    return $this->jsonDB->get("projects", $id, $query);
                }
        }
    }*/
}
