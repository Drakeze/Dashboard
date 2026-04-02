#!/usr/bin/env python3
"""
Character Data Generator
Generates fictional character data and exports as JSON.
"""

import json
import os
from pathlib import Path


def normalize_power_level(level: int) -> int:
    """Normalize power level to max 100."""
    return min(level, 100)


def get_power_rank(level: int) -> str:
    """Determine power rank based on level.
    
    Args:
        level: Power level (0-100)
    
    Returns:
        Power rank category: "Low", "Medium", or "High"
    """
    if level <= 30:
        return "Low"
    elif level <= 70:
        return "Medium"
    else:
        return "High"


def generate_character_summary(name: str, role: str, traits: list) -> str:
    """Generate a description summary for a character.
    
    Args:
        name: Character name
        role: Character role/description
        traits: List of character traits
    
    Returns:
        A brief summary string
    """
    traits_str = ", ".join(traits[:2])  # Use first 2 traits
    return f"{name} is a {role}. Known for being {traits_str}."


def generate_characters():
    """Generate character data and return processed list."""
    characters = [
        {
            "id": "gumball-watterson",
            "name": "Gumball Watterson",
            "show": "The Amazing World of Gumball",
            "role": "Main protagonist",
            "base_power_level": 45,
            "traits": ["curious", "optimistic", "loyal", "mischievous"],
        },
        {
            "id": "darwin-watterson",
            "name": "Darwin Watterson",
            "show": "The Amazing World of Gumball",
            "role": "Gumball's best friend",
            "base_power_level": 35,
            "traits": ["kind", "cautious", "supportive", "intelligent"],
        },
        {
            "id": "finn-the-human",
            "name": "Finn the Human",
            "show": "Adventure Time",
            "role": "Adventurer hero",
            "base_power_level": 72,
            "traits": ["brave", "determined", "compassionate", "skilled fighter"],
        },
        {
            "id": "jake-the-dog",
            "name": "Jake the Dog",
            "show": "Adventure Time",
            "role": "Magical shapeshifter",
            "base_power_level": 68,
            "traits": ["relaxed", "witty", "protective", "magical"],
        },
    ]
    
    # Process each character
    processed_characters = []
    for char in characters:
        processed_char = {
            **char,
            "power_level": normalize_power_level(char["base_power_level"]),
            "power_rank": get_power_rank(char["base_power_level"]),
            "summary": generate_character_summary(
                char["name"], char["role"], char["traits"]
            ),
        }
        processed_characters.append(processed_char)
    
    return processed_characters


def export_characters(characters: list, output_path: str):
    """Export characters to JSON file.
    
    Args:
        characters: List of character dictionaries
        output_path: Path where JSON will be saved
    """
    # Create directory if it doesn't exist
    Path(output_path).parent.mkdir(parents=True, exist_ok=True)
    
    # Write formatted JSON
    with open(output_path, "w") as f:
        json.dump(characters, f, indent=2)
    
    print(f"✓ Generated {len(characters)} characters")
    print(f"✓ Exported to: {output_path}")


if __name__ == "__main__":
    # Generate characters
    characters = generate_characters()
    
    # Determine output path (relative to script location)
    script_dir = Path(__file__).parent.parent
    output_file = script_dir / "data" / "characters.json"
    
    # Export to JSON
    export_characters(characters, str(output_file))
