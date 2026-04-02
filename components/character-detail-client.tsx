'use client';

import { getCharacterById } from '@/lib/character-data';
import type { Character } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import { ArrowLeft, Sword, Shield, Zap, Heart, Eye, Wand2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface CharacterDetailClientProps {
  character: Character | null;
}

export function CharacterDetailClient({ character }: CharacterDetailClientProps) {
  if (!character) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Sword className="w-5 h-5" />
            </EmptyMedia>
            <EmptyTitle>Character Not Found</EmptyTitle>
            <EmptyDescription>
              The character you&apos;re looking for doesn&apos;t exist.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Link href="/">
              <Button>Back to Directory</Button>
            </Link>
          </EmptyContent>
        </Empty>
      </div>
    );
  }

  const relatedCharacters = character.relationships
    .map((rel) => getCharacterById(rel.characterId))
    .filter((char): char is Character => char !== undefined);

  const statIcons: Record<string, React.ReactNode> = {
    strength: <Sword className="w-4 h-4" />,
    dexterity: <Zap className="w-4 h-4" />,
    constitution: <Heart className="w-4 h-4" />,
    intelligence: <Wand2 className="w-4 h-4" />,
    wisdom: <Eye className="w-4 h-4" />,
    charisma: <Shield className="w-4 h-4" />,
  };

  const statLabels: Record<string, string> = {
    strength: 'Strength',
    dexterity: 'Dexterity',
    constitution: 'Constitution',
    intelligence: 'Intelligence',
    wisdom: 'Wisdom',
    charisma: 'Charisma',
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border/30 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2 mb-4">
              <ArrowLeft className="w-4 h-4" />
              Back to Directory
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="overflow-hidden bg-card/80 border-border/30 backdrop-blur-sm">
              <div className="relative h-64 bg-gradient-to-b from-primary/20 to-transparent">
                {character.imageUrl.startsWith('/') ? (
                  <Image
                    src={character.imageUrl}
                    alt={character.name}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-b from-primary/30 to-secondary/30 flex items-center justify-center">
                    <Sword className="w-16 h-16 text-primary/50" />
                  </div>
                )}
              </div>

              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-4xl font-bold text-foreground mb-2">
                      {character.name}
                    </h1>
                    <p className="text-lg text-muted-foreground">
                      {character.race} {character.class}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 items-end">
                    <Badge className="bg-primary text-primary-foreground">
                      Level {character.level}
                    </Badge>
                    <Badge variant="outline">Alignment: {character.alignment}</Badge>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <Card className="bg-muted/30 border-border/50 p-4 text-center">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                      Experience
                    </p>
                    <p className="text-xl font-bold text-foreground">
                      {character.experience.toLocaleString()}
                    </p>
                  </Card>
                  <Card className="bg-muted/30 border-border/50 p-4 text-center">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                      Skills
                    </p>
                    <p className="text-xl font-bold text-foreground">
                      {character.skills.length}
                    </p>
                  </Card>
                  <Card className="bg-muted/30 border-border/50 p-4 text-center">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                      Achievements
                    </p>
                    <p className="text-xl font-bold text-foreground">
                      {character.achievements.length}
                    </p>
                  </Card>
                </div>
              </div>
            </Card>

            <Card className="bg-card/80 border-border/30 backdrop-blur-sm">
              <Tabs defaultValue="stats" className="w-full">
                <TabsList className="w-full justify-start rounded-none border-b border-border/30 bg-transparent p-0">
                  <TabsTrigger
                    value="stats"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
                  >
                    Stats
                  </TabsTrigger>
                  <TabsTrigger
                    value="skills"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
                  >
                    Skills & Equipment
                  </TabsTrigger>
                  <TabsTrigger
                    value="backstory"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
                  >
                    Backstory
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="stats" className="p-6">
                  <div className="space-y-4">
                    {Object.entries(character.stats).map(([key, value]) => (
                      <div key={key} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {statIcons[key]}
                            <span className="font-semibold text-foreground">
                              {statLabels[key]}
                            </span>
                          </div>
                          <span className="text-lg font-bold text-primary">{value}</span>
                        </div>
                        <div className="w-full bg-muted/30 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all"
                            style={{
                              width: `${(value / 20) * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="skills" className="p-6 space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-4">Skills</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {character.skills.map((skill) => (
                        <Card key={skill} className="bg-muted/30 border-border/50 p-3">
                          <p className="text-sm font-medium text-foreground">{skill}</p>
                        </Card>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-border/30 pt-6">
                    <h3 className="text-lg font-bold text-foreground mb-4">Equipment</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {character.equipment.map((item) => (
                        <Card
                          key={item}
                          className="bg-gradient-to-br from-primary/20 to-accent/20 border-border/50 p-3"
                        >
                          <p className="text-sm font-medium text-foreground">{item}</p>
                        </Card>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="backstory" className="p-6 space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2">Character Bio</h3>
                    <p className="text-muted-foreground leading-relaxed">{character.bio}</p>
                  </div>

                  <div className="border-t border-border/30 pt-4">
                    <h3 className="text-lg font-bold text-foreground mb-2">Full Backstory</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {character.backstory}
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-card/80 border-border/30 backdrop-blur-sm p-6">
              <h3 className="text-lg font-bold text-foreground mb-4">Achievements</h3>
              <div className="space-y-3">
                {character.achievements.map((achievement) => (
                  <div
                    key={achievement}
                    className="flex items-start gap-3 p-3 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg border border-border/30"
                  >
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <p className="text-sm font-medium text-foreground">{achievement}</p>
                  </div>
                ))}
              </div>
            </Card>

            {relatedCharacters.length > 0 && (
              <Card className="bg-card/80 border-border/30 backdrop-blur-sm p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Relationships</h3>
                <div className="space-y-4">
                  {character.relationships.map((rel) => {
                    const relatedChar = getCharacterById(rel.characterId);
                    if (!relatedChar) return null;

                    return (
                      <div key={rel.characterId} className="space-y-2">
                        <Link href={`/character/${rel.characterId}`}>
                          <p className="text-sm font-semibold text-primary hover:underline">
                            {relatedChar.name}
                          </p>
                        </Link>
                        <p className="text-xs text-muted-foreground">
                          <Badge variant="outline" className="text-xs mb-1">
                            {rel.type}
                          </Badge>{' '}
                          {rel.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
