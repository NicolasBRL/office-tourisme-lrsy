<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class PermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[
            \Spatie\Permission\PermissionRegistrar::class
        ]->forgetCachedPermissions();

        // create permissions
        $arrayOfPermissionNames = [
            // Lieu
            "access all lieux",
            "create lieux",
            "update lieux",
            "delete lieux",

            // Article
            "access all articles",
            "create articles",
            "update articles",
            "delete articles",

            // Categorie
            "access all categories",
            "create categories",
            "update categories",
            "delete categories",

            // Users
            "access all users",
            "create users",
            "update users",
            "delete users",
        ];
        $permissions = collect($arrayOfPermissionNames)->map(function (
            $permission
        ) {
            return ["name" => $permission, "guard_name" => "api"];
        });

        Permission::insert($permissions->toArray());

        // create role & give it permissions
        Role::create(["name" => "admin"])->givePermissionTo(Permission::all());
        Role::create(["name" => "editor"])->givePermissionTo(['access all articles',"create articles","update articles","delete articles"]);

        // Assign roles to users (in this case for user id -> 1 & 2)
        User::find(1)->assignRole('admin');
        User::find(2)->assignRole('editor');
    }
}