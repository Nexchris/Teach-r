<?php

namespace App\Entity;

use App\Repository\ProductRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ProductRepository::class)]
class Product
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;
    
    #[ORM\Column(type: "string")]
    private string $name; 
    
    #[ORM\Column(type: "text", nullable: true)]
    private ?string $description = null; 
    
    #[ORM\Column(type: "float")]
    private float $price; 
    
    #[ORM\Column(name: "creation_date", type: "datetime")] 
    private \DateTime $creationDate; 

    #[ORM\ManyToOne(targetEntity: Category::class)]  
    #[ORM\JoinColumn(nullable: false)]
    private ?Category $category = null;  

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;
        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;
        return $this;
    }

    public function getPrice(): float
    {
        return $this->price;
    }

    public function setPrice(float $price): self
    {
        $this->price = $price;
        return $this;
    }

    public function getCreationDate(): \DateTime
    {
        return $this->creationDate;
    }

    public function setCreationDate(\DateTime $creationDate): self
    {
        $this->creationDate = $creationDate;
        return $this;
    }

    public function getCategory(): ?Category  
    {
        return $this->category;
    }

    public function setCategory(?Category $category): self  
    {
        $this->category = $category;
        return $this;
    }
}
