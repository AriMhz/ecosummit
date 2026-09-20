<?php

namespace App\Filament\Resources\Bookings\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Schema;

class BookingForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Grid::make(3)->schema([
                    TextInput::make('booking_code')
                        ->required()
                        ->disabled()
                        ->default(fn () => 'ECO-' . rand(100000, 999999)),
                    TextInput::make('package_title')
                        ->required()
                        ->label('Selected Package'),
                    TextInput::make('total_amount')
                        ->placeholder('$3,780'),
                ]),

                Grid::make(4)->schema([
                    TextInput::make('full_name')->required(),
                    TextInput::make('email')->email()->required(),
                    TextInput::make('phone')->tel()->required(),
                    TextInput::make('country')->required(),
                ]),

                Grid::make(4)->schema([
                    DatePicker::make('departure_date')->required(),
                    TextInput::make('travelers_count')->numeric()->default(1)->required(),
                    Select::make('status')
                        ->options([
                            'new' => 'New / Unread',
                            'contacted' => 'Contacted Traveler',
                            'confirmed' => 'Confirmed & Booked',
                            'completed' => 'Expedition Completed',
                            'cancelled' => 'Cancelled',
                        ])
                        ->default('new')
                        ->required(),
                    Select::make('payment_status')
                        ->options([
                            'pending' => 'Payment Pending',
                            'deposit_paid' => 'Deposit Paid (25%)',
                            'fully_paid' => 'Fully Paid (100%)',
                            'refunded' => 'Refunded',
                        ])
                        ->default('pending')
                        ->required(),
                ]),

                Grid::make(2)->schema([
                    TextInput::make('room_preference')->placeholder('e.g. Twin Share or Single Supplement'),
                    TextInput::make('emergency_contact')->placeholder('Name & Phone Number'),
                ]),

                Textarea::make('dietary_requirements')
                    ->rows(2)
                    ->placeholder('Vegetarian, vegan, allergies, etc.'),

                Textarea::make('special_requests')
                    ->rows(3)
                    ->placeholder('Customer notes, gear requests, extra acclimatization days...'),

                Textarea::make('internal_notes')
                    ->rows(3)
                    ->label('Internal Admin Notes (Private)')
                    ->placeholder('Notes for operations team, assigned Sherpa guide, hotel bookings...'),
            ]);
    }
}
