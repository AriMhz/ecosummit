<?php

namespace App\Filament\Resources\HomepageSections\Schemas;

use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Schema;

class HomepageSectionForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Grid::make(3)->schema([
                    TextInput::make('section_key')
                        ->label('Section Identifier')
                        ->disabled()
                        ->required(),
                    TextInput::make('badge')
                        ->label('Small Section Eyebrow / Tag')
                        ->placeholder('e.g. HANDPICKED EXPEDITIONS'),
                    Toggle::make('is_active')
                        ->label('Section Active & Visible')
                        ->default(true),
                ]),

                Grid::make(2)->schema([
                    TextInput::make('headline')
                        ->label('Main Big Headline')
                        ->placeholder('e.g. FEATURED JOURNEYS')
                        ->required(),
                    TextInput::make('subheadline')
                        ->label('Subheadline / Caption')
                        ->placeholder('e.g. Handpicked Adventures for Unforgettable Memories'),
                ]),

                Textarea::make('description')
                    ->rows(3)
                    ->label('Section Summary / Supporting Narrative')
                    ->placeholder('Brief context explaining this section to travelers.'),

                Grid::make(2)->schema([
                    TextInput::make('cta_text')
                        ->label('Button Text (CTA)')
                        ->placeholder('e.g. Explore Journeys'),
                    TextInput::make('cta_link')
                        ->label('Button Link')
                        ->placeholder('e.g. /treks'),
                ]),

                TagsInput::make('media_items')
                    ->label('Slide & Background Image URLs')
                    ->placeholder('Add image URL and press Enter')
                    ->helperText('Used for Hero slider backgrounds or section visuals.'),
            ]);
    }
}
