"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface Recipe {
  title: string;
  image: string;
  time: number;
  description: string;
  vegan: boolean;
  id: string;
}

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("http://localhost:4000/recipes");
        if (!res.ok) throw new Error("Failed to Fetch");
        const data = await res.json();
        setRecipes(data);
      } catch (err) {
        console.warn("Fetch recipes error:", err);
      }
    }
    load();
  }, []);

  return (
    <main>
      <div className="py-10">
        <Button>Add Recipe</Button>
      </div>

      <div className=""></div>

      <div className="grid grid-cols-3 gap-8">
        {recipes.map((recipe) => (
          <Card key={recipe.id} className="flex flex-col justify-between">
            <CardHeader className="flex flex-row gap-4 items-center">
              <Avatar>
                <AvatarImage src={`/img/${recipe.image}`} alt="Recipe images" />
                <AvatarFallback>{recipe.title.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{recipe.title}</CardTitle>
                <CardDescription>{recipe.time} mins to cook</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p>{recipe.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button>View Recipe</Button>
              {recipe.vegan && <Badge variant="secondary">Vegan!</Badge>}
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}
