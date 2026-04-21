<?php

namespace App\Http\Controllers\Api;

use App\Services\ClickMaartSnapshotService;
use Illuminate\Http\Request;

class PublicApiController extends ApiController
{
    public function __construct(private readonly ClickMaartSnapshotService $service)
    {
    }

    public function meta()
    {
        return $this->success($this->service->meta());
    }

    public function storefrontSnapshot(Request $request)
    {
        return $this->success([
            'snapshot' => $this->service->storefrontSnapshot(
                $request->string('surface')->toString() ?: null,
                $request->string('tenantKey')->toString() ?: null,
            ),
        ]);
    }

    public function storefrontCatalog(Request $request)
    {
        return $this->success([
            'products' => $this->service->storefrontCatalog(
                $request->string('tenantKey')->toString() ?: null,
                $request->string('surface')->toString() ?: null,
            ),
        ]);
    }

    public function createStorefrontOrder(Request $request)
    {
        $data = $request->validate([
            'fullName' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['required', 'string', 'max:30'],
            'address' => ['required', 'string'],
            'city' => ['required', 'string', 'max:120'],
            'postalCode' => ['required', 'string', 'max:20'],
            'surface' => ['nullable', 'string'],
            'tenantKey' => ['nullable', 'string'],
            'items' => ['required', 'array', 'min:1'],
            'items.*.productId' => ['required', 'string'],
            'items.*.quantity' => ['required', 'integer', 'min:1'],
        ]);

        return $this->success(
            $this->service->createStorefrontOrder(
                $data,
                $data['tenantKey'] ?? null,
                $data['surface'] ?? null,
            ),
            'Order placed successfully.',
            201,
        );
    }

    public function storefrontOrder(\App\Models\Order $order)
    {
        return $this->success($this->service->storefrontOrderDetail($order));
    }

    public function stores()
    {
        return $this->success([
            'stores' => $this->service->storesForPublic(),
        ]);
    }
}
