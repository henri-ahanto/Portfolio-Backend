<?php

namespace App\Support;

use Illuminate\Support\Facades\Cache;

final class PortfolioCache
{
    public const KEY = 'portfolio.v1';

    public static function forget(): void
    {
        Cache::forget(self::KEY);
    }
}
