import express from 'express';
import {
    getInventoryMetrics,
    getRevenueMetrics,
    getMedicineGroups,
    getFrequentlyBoughtItem,
    getSuppliersCount,
    getCustomersCount,
    getDashboardMetrics,
} from '../controller/dashboard.controller.mjs';

const router = express.Router();

// Specific metric routes
router.get('/inventory', getInventoryMetrics);
router.get('/revenue', getRevenueMetrics);
router.get('/medicine-groups', getMedicineGroups);
router.get('/frequently-bought-item', getFrequentlyBoughtItem);
router.get('/suppliers', getSuppliersCount);
router.get('/customers', getCustomersCount);

// Aggregated dashboard endpoint
router.get('/', getDashboardMetrics);

export default router;
