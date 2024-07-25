<?php

namespace App\Api\v1;

use App\Entity\Projects;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Filesystem\Path;

class Endpoints
{
    public function __construct(private EntityManagerInterface $entityManager)
    {
    }

    public function handle($endpoint, $method, $id, $body, $query)
    {
        return $this->{$endpoint}($method, $id, $body, $query);
    }

    private function projects($method, $id, $body, $query)
    {
        switch ($method) {
            case "GET": {
                    return $this->getProjects($id, $body, $query);
                }
        }
    }

    private function getProjects($id, $body, $query)
    {
        $contents = $this->entityManager->getRepository(Projects::class)->findAll();
        $arr = [];
        foreach ($contents as $content) {
            $arr[] = [
                "id" => $content->getId(),
                "name" => $content->getName(),
            ];
        }
        return $arr;
    }
}
