<?php

namespace App\Filament\Resources\Destinations\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class DestinationForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Grid::make(3)->schema([
                    TextInput::make('name')
                        ->required()
                        ->live(onBlur: true)
                        ->afterStateUpdated(fn ($state, callable $set) => $set('slug', Str::slug($state))),
                    TextInput::make('slug')
                        ->required()
                        ->unique(ignoreRecord: true),
                    Select::make('tier')
                        ->label('Region Tier')
                        ->options([
                            'homeland' => 'Core Homeland (Nepal HQ)',
                            'cross-border' => 'Cross-Border (Bhutan, Tibet, India)',
                        ])
                        ->default('homeland')
                        ->required(),
                ]),

                Grid::make(3)->schema([
                    Select::make('country')
                        ->label('Country')
                        ->options([
                            'Nepal' => 'Nepal (The Himalayan Crown)',
                            'Bhutan' => 'Bhutan (Land of the Thunder Dragon)',
                            'Tibet' => 'Tibet (The Roof of the World)',
                        ])
                        ->default('Nepal')
                        ->required()
                        ->searchable(),
                    TextInput::make('best_season')->placeholder('e.g. March–May & Sept–Nov'),
                    TextInput::make('starting_price')->placeholder('e.g. $1,290'),
                ]),

                TextInput::make('image')->label('Cover Image URL')->required(),

                TextInput::make('subtitle')->placeholder('Short evocative subtitle'),

                Textarea::make('description')->rows(5)->required(),

                TagsInput::make('highlights')->placeholder('Add highlight and press Enter'),

                TagsInput::make('gallery')->placeholder('Add photo URL and press Enter'),

                Grid::make(2)->schema([
                    Toggle::make('is_featured')->label('Featured Destination')->default(true),
                    TextInput::make('journey_count')->numeric()->default(5),
                ]),
            ]);
    }
}
