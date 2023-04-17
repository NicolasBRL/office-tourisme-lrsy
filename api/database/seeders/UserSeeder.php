<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            [
                "email" => "nicolas@gmail.com",
                "password" => Hash::make("Admin123*"),
            ],
            [
                "email" => "editeur@gmail.com",
                "password" => Hash::make("Admin123*"),
            ],
        ];

        foreach ($users as $user) {
            \App\Models\User::create($user);
        }
    }
}
