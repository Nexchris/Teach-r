<?php

// src/Controller/ProductController.php
namespace App\Controller;

use App\Repository\ProductRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ProductController extends AbstractController
{
    #[Route('/', name: 'product_index', methods: ['GET'])]
    public function index(ProductRepository $productRepository): Response
    {
        // Récupérer les produits depuis la base de données
        $products = $productRepository->findAll();

        // Rendre la vue avec les produits
        return $this->render('product/index.html.twig', [
            'products' => $products,
        ]);
    }
}
