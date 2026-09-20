<?php

namespace App\Filament\Resources\HomepageSections\Tables;

use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Table;

class HomepageSectionsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('section_key')
                    ->label('Section')
                    ->badge()
                    ->color('primary')
                    ->formatStateUsing(fn (string $state): string => ucwords(str_replace('_', ' ', $state))),
                TextColumn::make('headline')
                    ->weight('bold')
                    ->searchable(),
                TextColumn::make('subheadline')
                    ->limit(50),
                TextColumn::make('badge')
                    ->badge()
                    ->color('gray'),
                ToggleColumn::make('is_active')
                    ->label('Visible'),
                TextColumn::make('updated_at')
                    ->dateTime()
                    ->label('Last Edited'),
            ])
            ->recordActions([
                EditAction::make(),
            ]);
    }
}
