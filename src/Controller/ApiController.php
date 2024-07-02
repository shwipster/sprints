<?php

namespace App\Controller;

use App\Api\v1\Endpoints;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\Filesystem\Path;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class ApiController extends AbstractController
{

    public function __construct(private Endpoints $endpoints)
    {
    }

    #[Route('/api/{version}/{endpoint}/{id}', defaults: ["id" => ""], methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'])]
    public function index(string $version, string $endpoint, string $id): Response
    {

        // TODO Dynamically load endpoints based on version

        header('Access-Control-Allow-Origin: *');
        header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
        header("Allow: GET, POST, OPTIONS, PUT, DELETE");
        $method = $_SERVER['REQUEST_METHOD'];
        if ($method == "OPTIONS") {
            die();
        }

        try {

            $request = Request::createFromGlobals();
            $method = $request->getMethod();
            $body = $request->getPayload()->all();
            $query = $request->query->all();

            /*echo "<pre>";
            var_dump($version);
            var_dump($endpoint);
            var_dump($id);
            var_dump($method);
            var_dump($body);
            var_dump($query);
            die();*/

            $data = $this->endpoints->handle($endpoint, $method, $id, $body, $query);
            return $this->json($data);
        } catch (\Exception $e) {
            throw $this->createNotFoundException();
        }
    }
}
