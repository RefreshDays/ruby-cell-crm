import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Customer } from '../types';

interface CustomerContextType {
    customers: Customer[];
    addCustomer: (customer: Omit<Customer, 'id' | 'joinDate'>) => void;
    updateCustomer: (id: string, updates: Partial<Customer>) => void;
    getCustomer: (id: string) => Customer | undefined;
}

const CustomerContext = createContext<CustomerContextType | undefined>(undefined);

const MOCK_CUSTOMERS: Customer[] = [
    {
        id: '1',
        name: 'Choi Ji-woo',
        phone: '010-1234-5678',
        age: 34,
        skinType: 'Dry',
        concerns: ['Dryness', 'Fine Lines'],
        devicesOwned: ['Handy Airbrush System'],
        hasFreeTrial: true,
        joinDate: '2025-01-15',
        lastVisit: '2025-02-20',
        purchases: [
            { id: 'p1', date: '2025-01-15', items: ['Handy Airbrush', '4U Ampoule'], totalAmount: 450000 }
        ],
        gallery: [],
        memo: 'Interested in business opportunity.'
    },
    {
        id: '2',
        name: 'Kim Tae-hee',
        phone: '010-9876-5432',
        age: 41,
        skinType: 'Sensitive',
        concerns: ['Redness', 'Elasticity'],
        devicesOwned: ['Home Airbrush System'],
        hasFreeTrial: false,
        joinDate: '2024-11-10',
        lastVisit: '2025-02-18',
        purchases: [],
        gallery: [],
        memo: 'Very sensitive to alcohol based toners.'
    }
];

export function CustomerProvider({ children }: { children: ReactNode }) {
    const [customers, setCustomers] = useState<Customer[]>(() => {
        const saved = localStorage.getItem('ruby-cell-customers');
        return saved ? JSON.parse(saved) : MOCK_CUSTOMERS;
    });

    // Save to localStorage whenever customers change
    // We can use a useEffect or just save in the handlers.
    // useEffect is cleaner but runs on every render if we are not careful,
    // but with this simple app it's fine.
    useEffect(() => {
        localStorage.setItem('ruby-cell-customers', JSON.stringify(customers));
    }, [customers]);

    const addCustomer = (customer: Omit<Customer, 'id' | 'joinDate'>) => {
        const newCustomer = {
            ...customer,
            id: Math.random().toString(36).substr(2, 9),
            joinDate: new Date().toISOString().split('T')[0],
            purchases: [],
            gallery: [],
            hasFreeTrial: customer.hasFreeTrial ?? false,
        };
        setCustomers(prev => [newCustomer, ...prev]);
    };

    const updateCustomer = (id: string, updates: Partial<Customer>) => {
        setCustomers(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
    };

    const getCustomer = (id: string) => customers.find(c => c.id === id);

    return (
        <CustomerContext.Provider value={{ customers, addCustomer, updateCustomer, getCustomer }}>
            {children}
        </CustomerContext.Provider>
    );
}

export function useCustomers() {
    const context = useContext(CustomerContext);
    if (context === undefined) {
        throw new Error('useCustomers must be used within a CustomerProvider');
    }
    return context;
}
