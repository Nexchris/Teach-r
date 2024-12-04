<?php

namespace App\Tests\Unit;

use App\Entity\Category;
use PHPUnit\Framework\TestCase;

class UnitCategoryTest extends TestCase
{
    public function testCategoryNameCanBeSetAndRetrieved(): void
    {
        $category = new Category();
        $category->setName("Technology");
        $this->assertEquals("Technology", $category->getName());
    }
}
