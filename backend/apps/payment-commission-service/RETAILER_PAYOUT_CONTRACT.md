# Retailer Payout Contract

This draft covers the Phase 5 retailer payout and commission surface.

## Purpose

- list retailer payout statements
- show gross sales, retailer profit, platform commission, and net payable
- expose pending, withdrawable, and paid payout states
- support retailer withdrawal once enabled by admin

## Draft Endpoints

- `GET /api/retailer/payouts`
- `GET /api/retailer/payouts/summary`
- `GET /api/retailer/payouts/{settlementId}`
- `POST /api/retailer/payouts/{settlementId}/withdraw`

## Response Shape

- settlement id
- related order id
- gross sales value
- retailer profit amount
- commission amount
- net payable amount
- payout status
- release timestamp
- settlement note

## Rules

- retailer payable remains `profit x 0.9`
- minimum withdrawal remains tk. 50
- processing time remains 1 to 3 business days
- dispute window remains 7 days after payout processing
