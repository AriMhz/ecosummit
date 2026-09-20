<?php

namespace App\Filament\Resources\Inquiries\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Schema;

class InquiryForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Grid::make(3)->schema([
                    Select::make('type')
                        ->options([
                            'general' => 'General Inquiry',
                            'plan_custom_trip' => 'Plan Your Trip (Custom)',
                        ])
                        ->default('general')
                        ->required(),
                    Select::make('status')
                        ->options([
                            'new' => 'New Lead',
                            'contacted' => 'Contacted Client',
                            'completed' => 'Converted / Completed',
                            'archived' => 'Archived',
                        ])
                        ->default('new')
                        ->required(),
                    TextInput::make('destination')
                        ->placeholder('e.g. Everest, Annapurna, Mustang'),
                ]),

                Grid::make(4)->schema([
                    TextInput::make('full_name')->required(),
                    TextInput::make('email')->email()->required(),
                    TextInput::make('phone')->tel(),
                    TextInput::make('country'),
                ]),

                Grid::make(4)->schema([
                    TextInput::make('preferred_date')->placeholder('e.g. October 2026'),
                    TextInput::make('duration_days')->placeholder('e.g. 14 Days'),
                    TextInput::make('group_size')->placeholder('e.g. 2 Adults'),
                    TextInput::make('budget_range')->placeholder('e.g. $2,000 - $3,500'),
                ]),

                TextInput::make('travel_style')->placeholder('e.g. Luxury Teahouse, Heli Trek, Camping Expedition'),

                TagsInput::make('interests')
                    ->placeholder('Add interest (e.g. Photography, Culture, High Passes) and press Enter'),

                Textarea::make('message')
                    ->rows(5)
                    ->label('Client Message & Custom Preferences')
                    ->required(),

                Textarea::make('internal_notes')
                    ->rows(3)
                    ->label('Internal Staff Notes')
                    ->placeholder('Follow-up status, proposed quote, assigned guide...'),
            ]);
    }
}
