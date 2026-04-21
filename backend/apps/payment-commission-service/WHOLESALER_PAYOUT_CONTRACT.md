# Wholesaler Payout Contract

This draft covers the Phase 4 wholesaler payout and settlement surface.

## Purpose

- list payout statements
- show gross order value, 10% commission, and net payable amount
- expose pending, withdrawable, and paid settlement states
- support wholesaler withdrawal requests once enabled by admin

## Draft Endpoints

- `GET /api/wholesaler/payouts`
- `GET /api/wholesaler/payouts/summary`
- `POST /api/wholesaler/payouts/{settlementId}/withdraw`
- `GET /api/wholesaler/payouts/{settlementId}`

## Response Shape

- settlement id
- related order id
- order amount
- commission amount
- net payable amount
- payout status
- release timestamp
- settlement note

## Rules

- platform commission remains 10%
- minimum withdrawal remains tk. 50
- processing time remains 1 to 3 business days
- dispute window remains 7 days after payout processing
