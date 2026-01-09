import { fetchWithAuth } from '@/lib/auth';
import { ActiveOrder, OfferStatus } from '@/types/dashboard';
import { useEffect, useState } from 'react';
import OfferCard from './offer-card';

export interface MyOfferType {
  id: string;
  service_request_id: string;
  service_request_code: string;
  role_name: string;
  provider_id: string;
  provider_code: string;
  provider_name: string;
  specialist_id: string;
  specialist_name: string;
  status: OfferStatus;
  daily_rate: number;
  travel_cost: number;
  total_cost: number;
  notes: string;
  created_at: string;
  update_at: string;
}

const OffersTab = () => {
  const [offers, setOffers] = useState<MyOfferType[]>([])

  useEffect(() => {
    fetchMyOffers()
  }, [])
  
  const fetchMyOffers = async () => {
    try {
      const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_BASE_URL}/requests/service-offers`)

      if (response.ok) {
        const data = await response.json()
        setOffers(data)
      }
    } catch (error) {
      console.error('Error fetching offers:', error)
    }
  }

  return (
    <div>
        <h3 className="text-xl font-bold text-gray-900 mb-6">My Submitted Offers</h3>
        <div className="space-y-4">
        {offers && offers.map((offer) => (
          <OfferCard key={offer.id} offer={offer} />
        ))}
        </div>
    </div>
  );
};

export default OffersTab;