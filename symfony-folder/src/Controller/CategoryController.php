<?php
namespace App\Controller;

use App\Entity\Category;
use App\Repository\CategoryRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;

#[Route('/api/category')]
final class CategoryController extends AbstractController
{
    #[Route('', name: 'api_category_index', methods: ['GET'])]
    public function index(CategoryRepository $categoryRepository): JsonResponse
    {
        $categories = $categoryRepository->findAll();
        $categoryData = [];

        foreach ($categories as $category) {
            $categoryData[] = [
                'id' => $category->getId(),
                'name' => $category->getName(),
            ];
        }

        return new JsonResponse($categoryData);
    }

    #[Route('/{id}', name: 'api_category_show', methods: ['GET'])]
    public function show(Category $category): JsonResponse
    {
        $categoryData = [
            'id' => $category->getId(),
            'name' => $category->getName(),
        ];

        return new JsonResponse($categoryData);
    }

    #[Route('', name: 'api_category_new', methods: ['POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager, ValidatorInterface $validator): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (isset($data['name'])) {
            $category = new Category();
            $category->setName($data['name']);
            
            $errors = $validator->validate($category);

            if (count($errors) > 0) {
                $errorMessages = [];
                foreach ($errors as $error) {
                    $errorMessages[] = $error->getMessage();
                }
                return new JsonResponse([
                    'status' => 'error',
                    'message' => $errorMessages,
                ], Response::HTTP_BAD_REQUEST);
            }

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

    #[Route('/{id}', name: 'api_category_edit', methods: ['PUT'])]
    public function edit(Request $request, Category $category, EntityManagerInterface $entityManager, ValidatorInterface $validator): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (isset($data['name'])) {
            $category->setName($data['name']);
            
            $errors = $validator->validate($category);

            if (count($errors) > 0) {
                $errorMessages = [];
                foreach ($errors as $error) {
                    $errorMessages[] = $error->getMessage();
                }
                return new JsonResponse([
                    'status' => 'error',
                    'message' => $errorMessages,
                ], Response::HTTP_BAD_REQUEST);
            }

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
