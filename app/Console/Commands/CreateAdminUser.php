<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

#[Signature('admin:create {email? : Adresse email de l’administrateur} {--name= : Nom affiché} {--password= : Mot de passe (12 caractères minimum)}')]
#[Description('Crée ou met à jour le compte administrateur du portfolio.')]
class CreateAdminUser extends Command
{
    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $email = trim((string) ($this->argument('email') ?? $this->ask('Adresse email de l’administrateur')));
        $name = trim((string) ($this->option('name') ?? $this->ask('Nom affiché', 'Administrateur')));
        $password = (string) $this->option('password');

        if ($password === '') {
            $password = (string) $this->secret('Mot de passe (12 caractères minimum)');
        }

        $validator = Validator::make([
            'email' => $email,
            'name' => $name,
            'password' => $password,
        ], [
            'email' => ['required', 'string', 'email', 'max:150'],
            'name' => ['required', 'string', 'max:100'],
            'password' => ['required', 'string', 'min:12'],
        ]);

        if ($validator->fails()) {
            foreach ($validator->errors()->all() as $error) {
                $this->error($error);
            }

            return self::FAILURE;
        }

        $user = User::query()->updateOrCreate(
            ['email' => Str::lower($email)],
            [
                'name' => $name,
                'password' => $password,
                'is_admin' => true,
                'email_verified_at' => now(),
            ],
        );

        $this->info("Le compte administrateur {$user->email} est prêt.");

        return self::SUCCESS;
    }
}
