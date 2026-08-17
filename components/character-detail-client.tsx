'use client';

import type { Character } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import { getCategoryAccent, CATEGORY_LABELS, CHART_TOOLTIP_STYLE } from '@/lib/theme';
import { ArrowLeft, Users, Sword, Shield, Zap, Heart, Eye, Wand2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

interface RelatedCharacter {
  character: Character;
  type: string;
  description: string;
}

interface CharacterDetailClientProps {
  character: Character | null;
  relatedCharacters?: RelatedCharacter[];
}

export function CharacterDetailClient({
  character,
  relatedCharacters = [],
}: CharacterDetailClientProps) {
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

  const accent = getCategoryAccent(character.category);

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

  const statSpread = Object.entries(character.stats).map(([key, value]) => ({
    stat: statLabels[key],
    value,
  }));

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <Link href="/">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Directory
          </Button>
        </Link>
      </div>

      <main className="container mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="overflow-hidden bg-card/80 border-border/30 backdrop-blur-sm">
              <div
                className="relative h-64"
                style={{
                  background: `linear-gradient(to bottom, ${accent.soft}, transparent)`,
                }}
              >
                {character.imageUrl.startsWith('/') ? (
                  <Image
                    src={character.imageUrl}
                    alt={character.name}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Users className="w-16 h-16" style={{ color: accent.color }} />
                  </div>
                )}
              </div>

              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h1 className="text-4xl font-bold text-foreground mb-2 tracking-tight">
                      {character.name}
                    </h1>
                    <p className="text-lg text-muted-foreground">
                      {character.race}{' '}
                      <span style={{ color: accent.color }}>
                        {CATEGORY_LABELS[character.category]}
                      </span>
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 items-end">
                    <Badge className="bg-primary text-primary-foreground">
                      Level {character.level}
                    </Badge>
                    <Badge variant="outline">Alignment: {character.alignment}</Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr] gap-4">
                  <div className="grid grid-cols-3 gap-4">
                    <Card className="bg-muted/30 border-border/50 p-4 text-center">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                        Experience
                      </p>
                      <p className="text-2xl font-semibold tabular-nums tracking-tight text-foreground">
                        {character.experience.toLocaleString()}
                      </p>
                    </Card>
                    <Card className="bg-muted/30 border-border/50 p-4 text-center">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                        Skills
                      </p>
                      <p className="text-2xl font-semibold tabular-nums tracking-tight text-foreground">
                        {character.skills.length}
                      </p>
                    </Card>
                    <Card className="bg-muted/30 border-border/50 p-4 text-center">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                        Achievements
                      </p>
                      <p className="text-2xl font-semibold tabular-nums tracking-tight text-foreground">
                        {character.achievements.length}
                      </p>
                    </Card>
                  </div>

                  <Card className="bg-muted/30 border-border/50 p-2">
                    <ResponsiveContainer width="100%" height={140}>
                      <RadarChart data={statSpread} outerRadius="75%">
                        <PolarGrid stroke="var(--border)" opacity={0.4} />
                        <PolarAngleAxis
                          dataKey="stat"
                          tick={{ fontSize: 9, fill: 'var(--muted-foreground)' }}
                        />
                        <Radar
                          dataKey="value"
                          stroke={accent.color}
                          fill={accent.color}
                          fillOpacity={0.35}
                        />
                        <Tooltip contentStyle={CHART_TOOLTIP_STYLE} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </Card>
                </div>
              </div>
            </Card>

            <Card
              className="bg-card/80 border-border/30 backdrop-blur-sm"
              style={{ '--tab-accent': accent.color } as React.CSSProperties}
            >
              <Tabs defaultValue="stats" className="w-full">
                <TabsList className="w-full justify-start rounded-none border-b border-border/30 bg-transparent p-0">
                  <TabsTrigger
                    value="stats"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-[var(--tab-accent)] data-[state=active]:shadow-none"
                  >
                    Stats
                  </TabsTrigger>
                  <TabsTrigger
                    value="skills"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-[var(--tab-accent)] data-[state=active]:shadow-none"
                  >
                    Skills & Equipment
                  </TabsTrigger>
                  <TabsTrigger
                    value="backstory"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-[var(--tab-accent)] data-[state=active]:shadow-none"
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
                          <span
                            className="text-lg font-bold tabular-nums"
                            style={{ color: accent.color }}
                          >
                            {value}
                          </span>
                        </div>
                        <Progress
                          value={(value / 20) * 100}
                          className="h-2 bg-muted/30"
                          indicatorColor={accent.color}
                        />
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
                          className="border-border/50 p-3"
                          style={{
                            background: `linear-gradient(to bottom right, ${accent.soft}, transparent)`,
                          }}
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
                    className="flex items-start gap-3 p-3 rounded-lg border border-border/30"
                    style={{
                      background: `linear-gradient(to right, ${accent.soft}, transparent)`,
                    }}
                  >
                    <div
                      className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                      style={{ backgroundColor: accent.color }}
                    />
                    <p className="text-sm font-medium text-foreground">{achievement}</p>
                  </div>
                ))}
              </div>
            </Card>

            {relatedCharacters.length > 0 && (
              <Card className="bg-card/80 border-border/30 backdrop-blur-sm p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Relationships</h3>
                <div className="space-y-4">
                  {relatedCharacters.map(({ character: relatedChar, type, description }) => (
                    <div key={relatedChar.id} className="space-y-2">
                      <Link href={`/character/${relatedChar.id}`}>
                        <p className="text-sm font-semibold text-primary hover:underline">
                          {relatedChar.name}
                        </p>
                      </Link>
                      <p className="text-xs text-muted-foreground">
                        <Badge variant="outline" className="text-xs mb-1">
                          {type}
                        </Badge>{' '}
                        {description}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
