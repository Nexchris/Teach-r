<?php

namespace App\Entity;

use App\Repository\ProduitsRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ProduitsRepository::class)]
class Produits
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;
    
    #[ORM\Column(type: "string")]
    private string $text;  // Propriété texte
    
    #[ORM\Column(type: "text", nullable: true)]
    private ?string $description = null;  // Propriété description (nullable pour pouvoir être vide)
    
    #[ORM\Column(type: "float")]
    private float $prix;  // Propriété prix
    
    #[ORM\Column(type: "datetime")]
    private \DateTime $creationdate;  // Propriété date de création (DateTime pour manipuler les dates)

    public function getId(): ?int
    {
        return $this->id;
    }

    // Ajout de getters et setters pour chaque propriété

    public function getText(): string
    {
        return $this->text;
    }

    public function setText(string $text): self
    {
        $this->text = $text;
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

    public function getPrix(): float
    {
        return $this->prix;
    }

    public function setPrix(float $prix): self
    {
        $this->prix = $prix;
        return $this;
    }

    public function getCreationdate(): \DateTime
    {
        return $this->creationdate;
    }

    public function setCreationdate(\DateTime $creationdate): self
    {
        $this->creationdate = $creationdate;
        return $this;
    }
}
