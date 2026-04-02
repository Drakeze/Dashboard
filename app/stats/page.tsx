'use client';

import { CHARACTERS } from '@/lib/character-data';
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
  Legend,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
} from 'recharts';
import { TrendingUp, Users, Trophy, BookOpen } from 'lucide-react';

// Data aggregations
const classDistribution = CHARACTERS.reduce(
  (acc, char) => {
    const existing = acc.find((c) => c.name === char.class);
    if (existing) {
      existing.value++;
    } else {
      acc.push({ name: char.class, value: 1 });
    }
    return acc;
  },
  [] as { name: string; value: number }[]
);

const raceDistribution = CHARACTERS.reduce(
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

const levelDistribution = CHARACTERS.sort((a, b) => a.level - b.level).map(
  (char) => ({
    name: char.name,
    level: char.level,
    experience: char.experience,
  })
);

const statComparison = CHARACTERS.map((char) => ({
  name: char.name.substring(0, 8),
  strength: char.stats.strength,
  dexterity: char.stats.dexterity,
  constitution: char.stats.constitution,
  intelligence: char.stats.intelligence,
  wisdom: char.stats.wisdom,
  charisma: char.stats.charisma,
}));

const experienceVsLevel = CHARACTERS.map((char) => ({
  name: char.name.substring(0, 8),
  experience: char.experience,
  level: char.level,
}));

const COLORS = [
  'oklch(0.65 0.15 42)',
  'oklch(0.7 0.2 35)',
  'oklch(0.5 0.15 280)',
  'oklch(0.6 0.15 35)',
  'oklch(0.55 0.15 25)',
  'oklch(0.68 0.18 45)',
];

const avgStats = {
  strength:
    CHARACTERS.reduce((sum, c) => sum + c.stats.strength, 0) / CHARACTERS.length,
  dexterity:
    CHARACTERS.reduce((sum, c) => sum + c.stats.dexterity, 0) / CHARACTERS.length,
  constitution:
    CHARACTERS.reduce((sum, c) => sum + c.stats.constitution, 0) /
    CHARACTERS.length,
  intelligence:
    CHARACTERS.reduce((sum, c) => sum + c.stats.intelligence, 0) /
    CHARACTERS.length,
  wisdom:
    CHARACTERS.reduce((sum, c) => sum + c.stats.wisdom, 0) / CHARACTERS.length,
  charisma:
    CHARACTERS.reduce((sum, c) => sum + c.stats.charisma, 0) / CHARACTERS.length,
};

const totalExperience = CHARACTERS.reduce((sum, c) => sum + c.experience, 0);
const avgExperience = totalExperience / CHARACTERS.length;
const maxLevel = Math.max(...CHARACTERS.map((c) => c.level));
const minLevel = Math.min(...CHARACTERS.map((c) => c.level));

export default function StatsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/30 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary/20 rounded-lg">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">
              Character Statistics
            </h1>
          </div>
          <p className="text-muted-foreground">
            Comprehensive analytics and insights about our character roster
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-card/80 border-border/30 backdrop-blur-sm p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  Total Characters
                </p>
                <p className="text-3xl font-bold text-foreground mt-2">
                  {CHARACTERS.length}
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
                <p className="text-3xl font-bold text-foreground mt-2">
                  {(
                    CHARACTERS.reduce((sum, c) => sum + c.level, 0) /
                    CHARACTERS.length
                  ).toFixed(1)}
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
                <p className="text-3xl font-bold text-foreground mt-2">
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
                <p className="text-3xl font-bold text-foreground mt-2">
                  {minLevel}-{maxLevel}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-primary/50" />
            </div>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Class Distribution */}
          <Card className="bg-card/80 border-border/30 backdrop-blur-sm p-6">
            <h2 className="text-lg font-bold text-foreground mb-6">
              Class Distribution
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={classDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name} (${value})`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {classDistribution.map((entry, index) => (
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
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--border)',
                  }}
                />
                <Bar dataKey="value" fill="oklch(0.65 0.15 42)" />
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
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--border)',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="level"
                  stroke="oklch(0.7 0.2 35)"
                  dot={{ fill: 'oklch(0.65 0.15 42)' }}
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
                  contentStyle={{
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--border)',
                  }}
                  cursor={{ fill: 'rgba(200, 150, 100, 0.2)' }}
                />
                <Scatter
                  name="Characters"
                  data={experienceVsLevel}
                  fill="oklch(0.65 0.15 42)"
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
              <BarChart
                data={[
                  {
                    name: 'Strength',
                    value: avgStats.strength,
                    fill: 'oklch(0.65 0.15 42)',
                  },
                  {
                    name: 'Dexterity',
                    value: avgStats.dexterity,
                    fill: 'oklch(0.7 0.2 35)',
                  },
                  {
                    name: 'Constitution',
                    value: avgStats.constitution,
                    fill: 'oklch(0.5 0.15 280)',
                  },
                  {
                    name: 'Intelligence',
                    value: avgStats.intelligence,
                    fill: 'oklch(0.6 0.15 35)',
                  },
                  {
                    name: 'Wisdom',
                    value: avgStats.wisdom,
                    fill: 'oklch(0.55 0.15 25)',
                  },
                  {
                    name: 'Charisma',
                    value: avgStats.charisma,
                    fill: 'oklch(0.68 0.18 45)',
                  },
                ]}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--border)"
                  opacity={0.3}
                />
                <XAxis dataKey="name" stroke="var(--muted-foreground)" />
                <YAxis stroke="var(--muted-foreground)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--border)',
                  }}
                />
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {[
                    { name: 'Strength', fill: 'oklch(0.65 0.15 42)' },
                    { name: 'Dexterity', fill: 'oklch(0.7 0.2 35)' },
                    { name: 'Constitution', fill: 'oklch(0.5 0.15 280)' },
                    { name: 'Intelligence', fill: 'oklch(0.6 0.15 35)' },
                    { name: 'Wisdom', fill: 'oklch(0.55 0.15 25)' },
                    { name: 'Charisma', fill: 'oklch(0.68 0.18 45)' },
                  ].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
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
              {CHARACTERS.sort((a, b) => b.level - a.level)
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
                        {char.race} {char.class}
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
              {CHARACTERS.sort((a, b) => b.experience - a.experience)
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
                        {char.race} {char.class}
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
