import React from 'react';
import { Euro, Calculator, Plane } from 'lucide-react';
import { ServiceOffer, ServiceOfferCreateType, ServiceRequest } from '@/types/service-type';

interface Props {
  offer: ServiceOfferCreateType;
  serviceRequest: ServiceRequest;
  onUpdate: (offer: ServiceOfferCreateType) => void;
}

export const PricingSection: React.FC<Props> = ({ offer, serviceRequest, onUpdate }) => {

  const onDailyrateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onUpdate({ 
        ...offer, 
        daily_rate: value === '' ? 0 : Number(value)
    });
  }

  const handleTravelCost = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onUpdate({ 
        ...offer, 
        travel_cost: value === '' ? 0 : Number(value)
    });
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-bold text-gray-900 flex items-center mb-4">
        <Euro className="w-5 h-5 mr-2 text-green-600" />
        Pricing Details
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Daily Rate (€) *
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">€</span>
            <input
              type="number"
              value={offer.daily_rate === 0 ? '' : offer.daily_rate}
              onChange={onDailyrateChange}
              className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg font-semibold"
              min="0"
              step="10"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">Rate per working day</p>
        </div>

        <div>
          <label className="flex text-sm font-medium text-gray-700 mb-2 items-center">
            <Plane className="w-4 h-4 mr-1" />
            Travelling Cost per Onsite Day (€) *
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">€</span>
            <input
              type="number"
              value={offer.travel_cost === 0 ? '' : offer.travel_cost}
              onChange={handleTravelCost}
              className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg font-semibold"
              min="0"
              step="10"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center mb-4">
          <Calculator className="w-5 h-5 mr-2 text-blue-600" />
          <h4 className="text-md font-bold text-gray-900">Cost Calculation</h4>
        </div>

        <div className="bg-linear-to-br from-blue-50 to-indigo-50 rounded-lg p-4 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-700">
              Base Cost (€{offer.daily_rate} × {serviceRequest.expected_man_days} days)
            </span>
            <span className="font-semibold text-gray-900">
              €{(offer.daily_rate * serviceRequest.expected_man_days).toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-700">
              Travel Cost
            </span>
            <span className="font-semibold text-gray-900">
              €{offer.travel_cost}
            </span>
          </div>
          <div className="border-t border-blue-200 pt-3 flex justify-between">
            <span className="font-bold text-gray-900">Total Offer Cost</span>
            <span className="font-bold text-2xl text-blue-900">
              €{offer.total_cost.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};