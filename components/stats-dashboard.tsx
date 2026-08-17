'use client';

import { Character } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
} from 'recharts';
import { TrendingUp, Users, Trophy, BookOpen } from 'lucide-react';
import { CHART_PALETTE, CHART_TOOLTIP_STYLE, CATEGORY_LABELS } from '@/lib/theme';

interface StatsDashboardProps {
  characters: Character[];
}

const COLORS = CHART_PALETTE;

export function StatsDashboard({ characters }: StatsDashboardProps) {
  const categoryDistribution = characters.reduce(
    (acc, char) => {
      const label = CATEGORY_LABELS[char.category] ?? char.category;
      const existing = acc.find((c) => c.name === label);
      if (existing) {
        existing.value++;
      } else {
        acc.push({ name: label, value: 1 });
      }
      return acc;
    },
    [] as { name: string; value: number }[]
  );

  const raceDistribution = characters.reduce(
    (acc, char) => {
      const existing = acc.find((r) => r.name === char.race);
      if (existing) {
        existing.value++;
      } else {
        acc.push({ name: char.race, value: 1 });
      }
      return acc;
    },
    [] as { name: string; value: number }[]
  );

  const levelDistribution = [...characters].sort((a, b) => a.level - b.level).map(
    (char) => ({
      name: char.name,
      level: char.level,
      experience: char.experience,
    })
  );

  const experienceVsLevel = characters.map((char) => ({
    name: char.name.substring(0, 8),
    experience: char.experience,
    level: char.level,
  }));

  const count = characters.length || 1;
  const avgStats = {
    strength: characters.reduce((sum, c) => sum + c.stats.strength, 0) / count,
    dexterity: characters.reduce((sum, c) => sum + c.stats.dexterity, 0) / count,
    constitution: characters.reduce((sum, c) => sum + c.stats.constitution, 0) / count,
    intelligence: characters.reduce((sum, c) => sum + c.stats.intelligence, 0) / count,
    wisdom: characters.reduce((sum, c) => sum + c.stats.wisdom, 0) / count,
    charisma: characters.reduce((sum, c) => sum + c.stats.charisma, 0) / count,
  };

  const avgStatsChartData = [
    { name: 'Strength', value: avgStats.strength },
    { name: 'Dexterity', value: avgStats.dexterity },
    { name: 'Constitution', value: avgStats.constitution },
    { name: 'Intelligence', value: avgStats.intelligence },
    { name: 'Wisdom', value: avgStats.wisdom },
    { name: 'Charisma', value: avgStats.charisma },
  ];

  const totalExperience = characters.reduce((sum, c) => sum + c.experience, 0);
  const avgExperience = totalExperience / count;
  const maxLevel = characters.length ? Math.max(...characters.map((c) => c.level)) : 0;
  const minLevel = characters.length ? Math.min(...characters.map((c) => c.level)) : 0;

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-10">
        {/* Page intro — not sticky, AppHeader already owns the sticky nav */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground tracking-tight">
            Statistics
          </h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive analytics and insights about the character roster
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-card/80 border-border/30 backdrop-blur-sm p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  Total Characters
                </p>
                <p className="text-4xl font-semibold tabular-nums tracking-tight text-foreground mt-2">
                  {characters.length}
                </p>
              </div>
              <Users className="w-8 h-8 text-primary/50" />
            </div>
          </Card>

          <Card className="bg-card/80 border-border/30 backdrop-blur-sm p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  Avg Level
                </p>
                <p className="text-4xl font-semibold tabular-nums tracking-tight text-foreground mt-2">
                  {(characters.reduce((sum, c) => sum + c.level, 0) / count).toFixed(1)}
                </p>
              </div>
              <Trophy className="w-8 h-8 text-accent/50" />
            </div>
          </Card>

          <Card className="bg-card/80 border-border/30 backdrop-blur-sm p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  Avg Experience
                </p>
                <p className="text-4xl font-semibold tabular-nums tracking-tight text-foreground mt-2">
                  {(avgExperience / 1000).toFixed(0)}K
                </p>
              </div>
              <BookOpen className="w-8 h-8 text-secondary/50" />
            </div>
          </Card>

          <Card className="bg-card/80 border-border/30 backdrop-blur-sm p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  Level Range
                </p>
                <p className="text-4xl font-semibold tabular-nums tracking-tight text-foreground mt-2">
                  {minLevel}-{maxLevel}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-primary/50" />
            </div>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Category Distribution */}
          <Card className="bg-card/80 border-border/30 backdrop-blur-sm p-6">
            <h2 className="text-lg font-bold text-foreground mb-6">
              Category Distribution
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name} (${value})`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryDistribution.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>

          {/* Race Distribution */}
          <Card className="bg-card/80 border-border/30 backdrop-blur-sm p-6">
            <h2 className="text-lg font-bold text-foreground mb-6">
              Race Distribution
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={raceDistribution}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--border)"
                  opacity={0.3}
                />
                <XAxis dataKey="name" stroke="var(--muted-foreground)" />
                <YAxis stroke="var(--muted-foreground)" />
                <Tooltip contentStyle={CHART_TOOLTIP_STYLE} />
                <Bar dataKey="value" fill={COLORS[0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Level Distribution */}
          <Card className="bg-card/80 border-border/30 backdrop-blur-sm p-6">
            <h2 className="text-lg font-bold text-foreground mb-6">
              Level Distribution
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={levelDistribution}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--border)"
                  opacity={0.3}
                />
                <XAxis
                  dataKey="name"
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  tick={{ fontSize: 12 }}
                  stroke="var(--muted-foreground)"
                />
                <YAxis stroke="var(--muted-foreground)" />
                <Tooltip contentStyle={CHART_TOOLTIP_STYLE} />
                <Line
                  type="monotone"
                  dataKey="level"
                  stroke={COLORS[1]}
                  dot={{ fill: COLORS[0] }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Experience vs Level */}
          <Card className="bg-card/80 border-border/30 backdrop-blur-sm p-6">
            <h2 className="text-lg font-bold text-foreground mb-6">
              Experience vs Level
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--border)"
                  opacity={0.3}
                />
                <XAxis
                  dataKey="level"
                  name="Level"
                  stroke="var(--muted-foreground)"
                />
                <YAxis
                  dataKey="experience"
                  name="Experience"
                  stroke="var(--muted-foreground)"
                />
                <Tooltip
                  contentStyle={CHART_TOOLTIP_STYLE}
                  cursor={{ fill: 'rgba(200, 150, 100, 0.2)' }}
                />
                <Scatter
                  name="Characters"
                  data={experienceVsLevel}
                  fill={COLORS[0]}
                />
              </ScatterChart>
            </ResponsiveContainer>
          </Card>

          {/* Average Stats */}
          <Card className="bg-card/80 border-border/30 backdrop-blur-sm p-6 lg:col-span-2">
            <h2 className="text-lg font-bold text-foreground mb-6">
              Average Character Statistics
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={avgStatsChartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--border)"
                  opacity={0.3}
                />
                <XAxis dataKey="name" stroke="var(--muted-foreground)" />
                <YAxis stroke="var(--muted-foreground)" />
                <Tooltip contentStyle={CHART_TOOLTIP_STYLE} />
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {avgStatsChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Character Rankings */}
        <Card className="bg-card/80 border-border/30 backdrop-blur-sm p-6">
          <h2 className="text-lg font-bold text-foreground mb-6">
            Character Rankings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Highest Level */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Highest Level</h3>
              {[...characters]
                .sort((a, b) => b.level - a.level)
                .slice(0, 3)
                .map((char, idx) => (
                  <div
                    key={char.id}
                    className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border/30"
                  >
                    <div>
                      <p className="font-medium text-foreground">
                        {idx + 1}. {char.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {char.race} {CATEGORY_LABELS[char.category] ?? char.category}
                      </p>
                    </div>
                    <Badge className="bg-primary text-primary-foreground">
                      Lvl {char.level}
                    </Badge>
                  </div>
                ))}
            </div>

            {/* Most Experience */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Most Experience</h3>
              {[...characters]
                .sort((a, b) => b.experience - a.experience)
                .slice(0, 3)
                .map((char, idx) => (
                  <div
                    key={char.id}
                    className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border/30"
                  >
                    <div>
                      <p className="font-medium text-foreground">
                        {idx + 1}. {char.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {char.race} {CATEGORY_LABELS[char.category] ?? char.category}
                      </p>
                    </div>
                    <Badge variant="outline">
                      {(char.experience / 1000).toFixed(0)}K XP
                    </Badge>
                  </div>
                ))}
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}
