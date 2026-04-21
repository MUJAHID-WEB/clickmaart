<?php

namespace App\Http\Controllers\Api;

use App\Models\Product;
use App\Models\Store;
use App\Services\ClickMaartSnapshotService;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class RetailerApiController extends ApiController
{
    public function __construct(private readonly ClickMaartSnapshotService $service)
    {
    }

    public function dashboard(Request $request)
    {
        return $this->success($this->service->retailerDashboard($request->user()));
    }

    public function profile(Request $request)
    {
        return $this->success([
            'profile' => $this->service->retailerProfile($request->user()),
        ]);
    }

    public function catalog(Request $request)
    {
        return $this->success([
            'records' => $this->service->retailerCatalog(
                $request->user(),
                $request->string('status')->toString() ?: null,
            ),
        ]);
    }

    public function stores(Request $request)
    {
        return $this->success([
            'records' => $this->service->retailerStores($request->user()),
        ]);
    }

    public function orders(Request $request)
    {
        return $this->success([
            'records' => $this->service->retailerOrders(
                $request->user(),
                $request->string('status')->toString() ?: null,
            ),
        ]);
    }

    public function payouts(Request $request)
    {
        return $this->success([
            'records' => $this->service->retailerPayouts(
                $request->user(),
                $request->string('status')->toString() ?: null,
            ),
        ]);
    }

    public function reports(Request $request)
    {
        return $this->success($this->service->retailerReports($request->user()));
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
            'profile' => $this->service->updateRetailerProfile(
                $request->user(),
                $data,
                $request->file('profile_photo'),
                $request->file('business_document'),
            ),
        ], 'Retailer profile updated.');
    }

    public function updateCatalog(Request $request, Product $product)
    {
        $data = $request->validate([
            'selling_price' => ['nullable', 'numeric', 'min:0'],
            'stock' => ['nullable', 'integer', 'min:0'],
            'status' => ['nullable', Rule::in(['live', 'draft', 'low-stock'])],
            'note' => ['nullable', 'string'],
        ]);

        return $this->success([
            'record' => $this->service->updateRetailerCatalogItem($request->user(), $product, $data),
        ], 'Retailer catalog item updated.');
    }

    public function updateStore(Request $request, Store $store)
    {
        $data = $request->validate([
            'name' => ['nullable', 'string', 'max:255'],
            'domain' => ['nullable', 'string', 'max:255'],
            'status' => ['nullable', Rule::in(['active', 'setup-pending'])],
            'note' => ['nullable', 'string'],
        ]);

        return $this->success([
            'record' => $this->service->updateRetailerStore($request->user(), $store, $data),
        ], 'Retailer store updated.');
    }
}
