<?php

namespace App\Filament\Resources\Reviews\Schemas;

use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Schema;

class ReviewForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Grid::make(3)->schema([
                    TextInput::make('author_name')->required()->label('Client Name'),
                    TextInput::make('author_country')->placeholder('e.g. United Kingdom, Switzerland'),
                    TextInput::make('rating')->numeric()->default(5.0)->step(0.1)->required(),
                ]),

                Grid::make(2)->schema([
                    TextInput::make('trek_name')->placeholder('e.g. Everest High Three Passes & Kala Patthar'),
                    TextInput::make('review_date')->placeholder('e.g. October 2025'),
                ]),

                TextInput::make('author_avatar')->label('Avatar Image URL'),
                TextInput::make('title')->label('Review Headline')->placeholder('e.g. Flawless expedition with true mountain masters'),

                Textarea::make('comment')->rows(5)->required()->label('Full Client Review'),

                Grid::make(2)->schema([
                    Toggle::make('is_verified')->label('Verified Trekker')->default(true),
                    Toggle::make('is_featured')->label('Show on Homepage')->default(true),
                ]),
            ]);
    }
}
