<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\Filesystem\Path;
use Psr\Log\LoggerInterface;

class FrontendController extends AbstractController
{
    const FRONTEND_INDEX = 'index.html';
    const FRONTEND_DIR = 'frontend/dist/frontend/browser';

    public function __construct(private Filesystem $filesystem, private LoggerInterface $logger)
    {
    }

    #[Route('/{uri}', requirements: ['uri' => '.*'], utf8: true)]
    public function index(string $uri): Response
    {
        $uri = $uri ? $uri : self::FRONTEND_INDEX;
        $rootDir = $this->getParameter('kernel.project_dir');
        $filename = Path::join($rootDir, self::FRONTEND_DIR, $uri);
        //$this->logger->info($filename);

        if ($this->filesystem->exists($filename)) {

            $response = new BinaryFileResponse($filename);

            /*
                Fix MIME types 
                Symfony should figure it out but doesnt
                JS and CSS are sent as text/plain
            */
            if (preg_match('/.*\.(?:js)(?:\?\S+)?$/i', $filename)) {
                $response->headers->set("Content-Type", "text/javascript");
            }
            if (preg_match('/.*\.(?:css)(?:\?\S+)?$/i', $filename)) {
                $response->headers->set("Content-Type", "text/css");
            }
            if (preg_match('/.*\.(?:svg)(?:\?\S+)?$/i', $filename)) {
                $response->headers->set("Content-Type", "image/svg+xml");
            }
        } else {
            throw $this->createNotFoundException();
        }
        return $response;
    }
}
