<?php

namespace App\Tests\Unit;

use PHPUnit\Framework\TestCase;
use App\Entity\Product;
use App\Entity\Category;

class UnitProductTest extends TestCase
{
    public function testCreateProduct(): void
    {
        $product = new Product();
        
        $category = new Category();
        $category->setName("Jeux Vidéos");

        $product->setName("GTA V");
        $product->setDescription("L'un des jeux les plus révolutionnaires de ce temps");
        $product->setPrice(59.99);
        $product->setCreationDate(new \DateTime());
        $product->setCategory($category);
        
        $this->assertEquals("GTA V", $product->getName());
        $this->assertEquals("L'un des jeux les plus révolutionnaires de ce temps", $product->getDescription());
        $this->assertEquals(59.99, $product->getPrice());
        $this->assertInstanceOf(\DateTime::class, $product->getCreationDate());
        $this->assertEquals($category, $product->getCategory());
    }

    public function testPricePositive(): void
    {
        $product = new Product();
        $product->setPrice(100);
        $this->assertGreaterThan(0, $product->getPrice());

        $product->setPrice(-1);
        $this->assertLessThanOrEqual(0, $product->getPrice());
    }
}
