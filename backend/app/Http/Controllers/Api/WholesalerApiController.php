<?php

namespace App\Http\Controllers\Api;

use App\Models\Product;
use App\Services\ClickMaartSnapshotService;
use Illuminate\Http\Request;

class WholesalerApiController extends ApiController
{
    public function __construct(private readonly ClickMaartSnapshotService $service)
    {
    }

    public function dashboard(Request $request)
    {
        return $this->success($this->service->wholesalerDashboard($request->user()));
    }

    public function profile(Request $request)
    {
        return $this->success([
            'profile' => $this->service->wholesalerProfile($request->user()),
        ]);
    }

    public function products(Request $request)
    {
        return $this->success([
            'records' => $this->service->wholesalerProducts(
                $request->user(),
                $request->string('status')->toString() ?: null,
            ),
        ]);
    }

    public function orders(Request $request)
    {
        return $this->success([
            'records' => $this->service->wholesalerOrders(
                $request->user(),
                $request->string('status')->toString() ?: null,
            ),
        ]);
    }

    public function payouts(Request $request)
    {
        return $this->success([
            'records' => $this->service->wholesalerPayouts(
                $request->user(),
                $request->string('status')->toString() ?: null,
            ),
        ]);
    }

    public function reports(Request $request)
    {
        return $this->success($this->service->wholesalerReports($request->user()));
    }

    public function updateProfile(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email,'.$request->user()->id],
            'phone' => ['nullable', 'string', 'max:30'],
            'business_name' => ['nullable', 'string', 'max:255'],
            'business_type' => ['nullable', 'string', 'max:255'],
            'trade_license' => ['nullable', 'string', 'max:255'],
            'address' => ['nullable', 'string'],
            'profile_photo' => ['nullable', 'file', 'mimes:jpg,jpeg,png', 'max:2048'],
            'business_document' => ['nullable', 'file', 'mimes:pdf,jpg,jpeg,png', 'max:4096'],
        ]);

        return $this->success([
            'profile' => $this->service->updateWholesalerProfile(
                $request->user(),
                $data,
                $request->file('profile_photo'),
                $request->file('business_document'),
            ),
        ], 'Wholesaler profile updated.');
    }

    public function updateProduct(Request $request, Product $product)
    {
        $data = $request->validate([
            'price' => ['nullable', 'numeric', 'min:0'],
            'stock' => ['nullable', 'integer', 'min:0'],
            'description' => ['nullable', 'string'],
            'details' => ['nullable', 'string'],
            'resubmit' => ['nullable', 'boolean'],
        ]);

        return $this->success([
            'record' => $this->service->updateWholesalerProduct($request->user(), $product, $data),
        ], 'Wholesaler product updated.');
    }
}
