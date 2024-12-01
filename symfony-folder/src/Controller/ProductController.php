<?php

namespace App\Controller;

use App\Entity\Product;
use App\Entity\Category;
use App\Repository\ProductRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/product')]
final class ProductController extends AbstractController
{
    // Liste tous les produits
    #[Route('', name: 'api_product_index', methods: ['GET'])]
    public function index(ProductRepository $productRepository): JsonResponse
    {
        $products = $productRepository->findAll();

        $productData = array_map(fn(Product $product) => [
            'id' => $product->getId(),
            'name' => $product->getName(),
            'price' => $product->getPrice(),
            'description' => $product->getDescription(),
            'creation_date' => $product->getCreationDate()->format('Y-m-d H:i:s'),
            'category' => $product->getCategory() ? [
                'id' => $product->getCategory()->getId(),
                'name' => $product->getCategory()->getName()
            ] : null,
        ], $products);

        return $this->json($productData);
    }

    // Affiche un produit spécifique
    #[Route('/{id}', name: 'api_product_show', methods: ['GET'])]
    public function show(Product $product): JsonResponse
    {
        $productData = [
            'id' => $product->getId(),
            'name' => $product->getName(),
            'price' => $product->getPrice(),
            'description' => $product->getDescription(),
            'creation_date' => $product->getCreationDate()->format('Y-m-d H:i:s'),
            'category' => $product->getCategory() ? [
                'id' => $product->getCategory()->getId(),
                'name' => $product->getCategory()->getName()
            ] : null,
        ];

        return $this->json($productData);
    }

    // Crée un nouveau produit
    #[Route('', name: 'api_product_new', methods: ['POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (!isset($data['name'], $data['price'], $data['description'], $data['category'])) {
            return $this->json([
                'status' => 'error',
                'message' => 'Missing required fields: name, price, description, category.',
            ], Response::HTTP_BAD_REQUEST);
        }

        $category = $entityManager->getRepository(Category::class)->find($data['category']);

        if (!$category) {
            return $this->json([
                'status' => 'error',
                'message' => 'Category not found.',
            ], Response::HTTP_BAD_REQUEST);
        }

        $product = new Product();
        $product->setName($data['name']);
        $product->setPrice($data['price']);
        $product->setDescription($data['description']);
        $product->setCreationDate(new \DateTime());
        $product->setCategory($category);

        $entityManager->persist($product);
        $entityManager->flush();

        return $this->json([
            'status' => 'success',
            'id' => $product->getId(),
        ], Response::HTTP_CREATED);
    }

    // Met à jour un produit
    #[Route('/{id}', name: 'api_product_edit', methods: ['PUT'])]
    public function edit(Request $request, Product $product, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (!isset($data['name'], $data['price'], $data['description'], $data['category'])) {
            return $this->json([
                'status' => 'error',
                'message' => 'Missing required fields: name, price, description, category.',
            ], Response::HTTP_BAD_REQUEST);
        }

        $category = $entityManager->getRepository(Category::class)->find($data['category']);

        if (!$category) {
            return $this->json([
                'status' => 'error',
                'message' => 'Category not found.',
            ], Response::HTTP_BAD_REQUEST);
        }

        $product->setName($data['name']);
        $product->setPrice($data['price']);
        $product->setDescription($data['description']);
        $product->setCategory($category);

        $entityManager->flush();

        return $this->json([
            'status' => 'success',
            'message' => 'Product updated successfully.',
        ]);
    }

    // Supprime un produit
    #[Route('/{id}', name: 'api_product_delete', methods: ['DELETE'])]
    public function delete(Product $product, EntityManagerInterface $entityManager): JsonResponse
    {
        $entityManager->remove($product);
        $entityManager->flush();

        return $this->json([
            'status' => 'success',
            'message' => 'Product deleted successfully.',
        ]);
    }
}
