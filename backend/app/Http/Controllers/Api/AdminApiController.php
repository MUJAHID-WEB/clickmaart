<?php

namespace App\Http\Controllers\Api;

use App\Models\CommissionSettlement;
use App\Models\Order;
use App\Models\Product;
use App\Models\Store;
use App\Models\User;
use App\Services\ClickMaartSnapshotService;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class AdminApiController extends ApiController
{
    public function __construct(private readonly ClickMaartSnapshotService $service)
    {
    }

    public function dashboard()
    {
        return $this->success($this->service->adminDashboard());
    }

    public function profile()
    {
        return $this->success([
            'profile' => $this->service->adminProfile(),
        ]);
    }

    public function wholesalers(Request $request)
    {
        return $this->success([
            'records' => $this->service->adminWholesalers($request->string('status')->toString() ?: null),
        ]);
    }

    public function updateWholesalerStatus(Request $request, User $user)
    {
        $data = $request->validate([
            'status' => ['required', Rule::in(['pending', 'approved', 'rejected'])],
            'reason' => ['nullable', 'string'],
        ]);

        return $this->success([
            'record' => $this->service->updateUserStatus($user, $data['status'], $data['reason'] ?? null),
        ], 'Wholesaler status updated.');
    }

    public function retailers(Request $request)
    {
        return $this->success([
            'records' => $this->service->adminRetailers($request->string('status')->toString() ?: null),
        ]);
    }

    public function updateRetailerStatus(Request $request, User $user)
    {
        $data = $request->validate([
            'status' => ['required', Rule::in(['pending', 'approved', 'rejected'])],
            'reason' => ['nullable', 'string'],
        ]);

        return $this->success([
            'record' => $this->service->updateUserStatus($user, $data['status'], $data['reason'] ?? null),
        ], 'Retailer status updated.');
    }

    public function products(Request $request)
    {
        return $this->success([
            'records' => $this->service->adminProducts($request->string('status')->toString() ?: null),
        ]);
    }

    public function updateProductStatus(Request $request, Product $product)
    {
        $data = $request->validate([
            'status' => ['required', Rule::in(['pending', 'approved', 'rejected'])],
            'note' => ['nullable', 'string'],
        ]);

        return $this->success([
            'record' => $this->service->updateProductStatus($product, $data['status'], $data['note'] ?? null),
        ], 'Product moderation status updated.');
    }

    public function orders(Request $request)
    {
        return $this->success([
            'records' => $this->service->adminOrders($request->string('status')->toString() ?: null),
        ]);
    }

    public function orderDetail(Order $order)
    {
        return $this->success($this->service->adminOrderDetail($order));
    }

    public function updateOrderStage(Request $request, Order $order)
    {
        $data = $request->validate([
            'stage' => ['required', 'string'],
            'note' => ['nullable', 'string'],
        ]);

        return $this->success([
            'record' => $this->service->updateOrderStage($order, $data['stage'], $data['note'] ?? null),
        ], 'Order lifecycle updated.');
    }

    public function delivery()
    {
        return $this->success($this->service->adminDelivery());
    }

    public function commission()
    {
        return $this->success($this->service->adminCommission());
    }

    public function updateCommissionStatus(Request $request, CommissionSettlement $settlement)
    {
        $data = $request->validate([
            'status' => ['required', Rule::in(['ready', 'pending-approval', 'processed', 'paid'])],
            'note' => ['nullable', 'string'],
        ]);

        return $this->success([
            'record' => $this->service->updateCommissionStatus($settlement, $data['status'], $data['note'] ?? null),
        ], 'Settlement status updated.');
    }

    public function reports(Request $request)
    {
        $view = $request->string('view')->toString() ?: 'overview';

        return $this->success($this->service->adminReports($view));
    }

    public function createExport(Request $request)
    {
        $data = $request->validate([
            'report' => ['required', 'string'],
            'format' => ['required', Rule::in(['csv', 'pdf', 'CSV', 'PDF'])],
            'scope' => ['required', 'string'],
        ]);

        return $this->success([
            'export' => $this->service->createExport(
                $data['report'],
                $data['format'],
                $data['scope'],
                $request->user()->name,
            ),
        ], 'Export queued.', 201);
    }

    public function stores()
    {
        return $this->success($this->service->adminStores());
    }

    public function storeDetail(Store $store)
    {
        return $this->success($this->service->adminStoreDetail($store));
    }

    public function updateStoreStatus(Request $request, Store $store)
    {
        $data = $request->validate([
            'status' => ['required', Rule::in(['live', 'draft', 'dns-pending', 'setup-pending'])],
            'note' => ['nullable', 'string'],
        ]);

        return $this->success([
            'record' => $this->service->updateStoreStatus($store, $data['status'], $data['note'] ?? null),
        ], 'Store status updated.');
    }
}
