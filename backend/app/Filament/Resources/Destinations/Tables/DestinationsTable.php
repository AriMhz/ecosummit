<?php

namespace App\Filament\Resources\Destinations\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class DestinationsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('image')->circular(),
                TextColumn::make('name')->weight('bold')->searchable()->sortable(),
                TextColumn::make('country')
                    ->badge()
                    ->color(fn (?string $state): string => match ($state) {
                        'Nepal' => 'success',
                        'Bhutan' => 'warning',
                        'Tibet' => 'info',
                        default => 'gray',
                    })
                    ->searchable()
                    ->sortable(),
                TextColumn::make('tier')->badge()->color(fn (string $state): string => $state === 'homeland' ? 'success' : 'info'),
                TextColumn::make('journey_count')->label('Routes'),
                TextColumn::make('starting_price')->label('From'),
                ToggleColumn::make('is_featured')->label('Featured'),
            ])
            ->filters([
                SelectFilter::make('country')
                    ->options([
                        'Nepal' => 'Nepal',
                        'Bhutan' => 'Bhutan',
                        'Tibet' => 'Tibet',
                    ]),
                SelectFilter::make('tier')
                    ->options([
                        'homeland' => 'Core Homeland (Nepal)',
                        'cross-border' => 'Cross-Border (Bhutan / Tibet)',
                    ]),
            ])
            ->recordActions([
                EditAction::make(),
                DeleteAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
