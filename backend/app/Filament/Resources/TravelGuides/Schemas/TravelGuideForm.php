<?php

namespace App\Filament\Resources\TravelGuides\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class TravelGuideForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Grid::make(3)->schema([
                    TextInput::make('title')
                        ->required()
                        ->live(onBlur: true)
                        ->afterStateUpdated(fn ($state, callable $set) => $set('slug', Str::slug($state))),
                    TextInput::make('slug')
                        ->required()
                        ->unique(ignoreRecord: true),
                    Select::make('category')
                        ->options([
                            'Altitude & Health' => 'Altitude & Health',
                            'Gear & Equipment' => 'Gear & Equipment',
                            'Culture & Ethics' => 'Culture & Ethics',
                            'Route Guides' => 'Route Guides',
                        ])
                        ->default('Altitude & Health')
                        ->required(),
                ]),

                Grid::make(3)->schema([
                    TextInput::make('cover_image')->label('Cover Image URL')->required(),
                    TextInput::make('read_time')->placeholder('e.g. 6 min read')->default('5 min read'),
                    TextInput::make('author')->default('EcoSummit Himalayan Team'),
                ]),

                Textarea::make('excerpt')
                    ->rows(2)
                    ->placeholder('Short teaser displayed on the guide cards.')
                    ->required(),

                Textarea::make('content')
                    ->rows(10)
                    ->label('Article Content (Markdown supported)')
                    ->required(),

                Grid::make(2)->schema([
                    DatePicker::make('published_at')->default(now()),
                    Toggle::make('is_featured')->label('Featured Article')->default(false),
                ]),
            ]);
    }
}
