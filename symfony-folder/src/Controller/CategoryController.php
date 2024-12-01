<?php

namespace App\Controller;

use App\Entity\Category;
use App\Form\CategoryType;
use App\Repository\CategoryRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/category')]
final class CategoryController extends AbstractController
{
    // Liste toutes les catégories
    #[Route('', name: 'api_category_index', methods: ['GET'])]
    public function index(CategoryRepository $categoryRepository): JsonResponse
    {
        $categories = $categoryRepository->findAll();
        $categoryData = [];

        foreach ($categories as $category) {
            $categoryData[] = [
                'id' => $category->getId(),
                'name' => $category->getName(),
                // Ajoute d'autres attributs si nécessaire
            ];
        }

        return new JsonResponse($categoryData);
    }

    // Affiche une catégorie spécifique
    #[Route('/{id}', name: 'api_category_show', methods: ['GET'])]
    public function show(Category $category): JsonResponse
    {
        $categoryData = [
            'id' => $category->getId(),
            'name' => $category->getName(),
            // Ajoute d'autres attributs si nécessaire
        ];

        return new JsonResponse($categoryData);
    }

    // Crée une nouvelle catégorie
    #[Route('', name: 'api_category_new', methods: ['POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (isset($data['name'])) {
            $category = new Category();
            $category->setName($data['name']);
            // Ajoute d'autres attributs si nécessaire

            $entityManager->persist($category);
            $entityManager->flush();

            return new JsonResponse([
                'status' => 'success',
                'id' => $category->getId(),
            ], Response::HTTP_CREATED);
        }

        return new JsonResponse([
            'status' => 'error',
            'message' => 'Invalid data',
        ], Response::HTTP_BAD_REQUEST);
    }

    // Met à jour une catégorie
    #[Route('/{id}', name: 'api_category_edit', methods: ['PUT'])]
    public function edit(Request $request, Category $category, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (isset($data['name'])) {
            $category->setName($data['name']);
            // Ajoute d'autres attributs si nécessaire

            $entityManager->flush();

            return new JsonResponse([
                'status' => 'success',
                'message' => 'Category updated successfully',
            ]);
        }

        return new JsonResponse([
            'status' => 'error',
            'message' => 'Invalid data',
        ], Response::HTTP_BAD_REQUEST);
    }

    // Supprime une catégorie
    #[Route('/{id}', name: 'api_category_delete', methods: ['DELETE'])]
    public function delete(Request $request, Category $category, EntityManagerInterface $entityManager): JsonResponse
    {
        $entityManager->remove($category);
        $entityManager->flush();

        return new JsonResponse([
            'status' => 'success',
            'message' => 'Category deleted successfully',
        ]);
    }
}
