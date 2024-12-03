<?php

namespace App\Entity;
use App\Repository\ProductRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: ProductRepository::class)]
class Product
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null; 
    // L'id est la clé primaire et est auto-incrémenté par la base de données lorsque le produit est inséré.

    #[ORM\Column(type: "string")]
    #[Assert\NotBlank(message: "Le nom du produit ne peut pas être vide")]
    #[Assert\Length(min: 3, max: 30, 
        minMessage: "Le nom du produit doit être d'au moins 3 caractères", 
        maxMessage: "Le nom du produit ne peut pas dépasser 30 caractères")]
    private string $name; 
    // Le nom du produit ne doit pas être vide, et doit avoir entre 3 et 30 caractères.

    #[ORM\Column(type: "text", nullable: true)]
    #[Assert\Length(max: 1000, maxMessage: "La description ne peut pas dépasser 1000 caractères.")]
    private ?string $description = null; 
    // La description n'est pas obligatoire mais doit respecter la limite de caractères.

    #[ORM\Column(type: "float")]
    #[Assert\NotBlank(message: "Le prix ne peut pas être vide")]
    #[Assert\Positive(message: "Le prix doit être positif.")]
    private float $price; 
    // Le prix du produit ne peut pas être vide et doit être un nombre positif.

    #[ORM\Column(name: "creation_date", type: "datetime")] 
    #[Assert\NotNull(message: "La date de création est obligatoire")]
    private \DateTime $creationDate; 
    // La date de création est obligatoire.

    #[ORM\ManyToOne(targetEntity: Category::class)]  
    #[ORM\JoinColumn(nullable: false)]
    #[Assert\NotNull(message: "Un produit doit posséder une catégorie.")]
    private ?Category $category = null;  
    // Un produit doit être obligatoirement associé à une catégorie. Si aucune catégorie n'est définie, un produit ne pourra pas être crée.
    // Une fois inséré dans la base de données, un produit aura une relation avec une catégorie via `category_id`.

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
