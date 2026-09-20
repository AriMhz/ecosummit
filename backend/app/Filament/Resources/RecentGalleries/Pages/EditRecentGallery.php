<?php

namespace App\Filament\Resources\RecentGalleries\Pages;

use App\Filament\Resources\RecentGalleries\RecentGalleryResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditRecentGallery extends EditRecord
{
    protected static string $resource = RecentGalleryResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
