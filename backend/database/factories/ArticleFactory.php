<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\article>
 */
class ArticleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(6),
            'photo' => fake()->imageUrl(),
            'author' => fake()->name(),
            'description' => fake()->paragraph(),
            'content' => fake()->paragraphs(3, true),
            'keyword' => fake()->randomElement(['sport', 'social', 'éducation', 'santé', 'loisirs', 'service publique', 'transport', 'événement']),
        ];
    }
}