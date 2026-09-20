<?php

namespace App\Filament\Resources\TeamMembers\Schemas;

use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Schema;

class TeamMemberForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Grid::make(3)->schema([
                    TextInput::make('name')->required()->label('Full Name'),
                    TextInput::make('role')->required()->placeholder('e.g. Lead Mountain Guide & UIAGM'),
                    TextInput::make('experience_years')->numeric()->default(10)->label('Years in High Altitude'),
                ]),

                Grid::make(2)->schema([
                    TextInput::make('summits_count')->placeholder('e.g. 9x Everest Summitteer'),
                    TextInput::make('speciality')->placeholder('e.g. Glacial Rescue & Oxygen Protocols'),
                ]),

                TextInput::make('photo')->label('Photo URL')->placeholder('https://...'),

                Textarea::make('bio')->rows(4)->label('Sherpa / Guide Biography'),

                TextInput::make('order')->numeric()->default(0),
            ]);
    }
}
