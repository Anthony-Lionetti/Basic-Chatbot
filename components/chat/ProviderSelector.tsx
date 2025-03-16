// components/chat/ProviderSelector.tsx
// components/chat/ProviderSelector.tsx (with styling fixes)
"use client";
import React, { useState, useEffect } from "react";
import { Select } from "@radix-ui/themes";

interface Provider {
  id: string;
  name: string;
  description: string;
}

interface ProviderSelectorProps {
  selectedProvider: string;
  onProviderChange: (providerId: string) => void;
}

export default function ProviderSelector({
  selectedProvider,
  onProviderChange,
}: ProviderSelectorProps) {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await fetch("/api/chat/provider");
        if (!response.ok) {
          throw new Error("Failed to fetch providers");
        }
        const data = await response.json();
        setProviders(data.providers);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching providers:", error);
        setLoading(false);
      }
    };

    fetchProviders();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center px-3 py-1 text-sm text-gray-9">
        Loading providers...
      </div>
    );
  }

  return (
    <Select.Root value={selectedProvider} onValueChange={onProviderChange}>
      <Select.Trigger 
        placeholder="Select provider" 
        variant="surface" 
        color="gray" 
        radius="medium"
      />
      <Select.Content variant="solid" color="green" position="popper">
        {providers.map((provider) => (
          <Select.Item key={provider.id} value={provider.id}>
            {provider.name}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
}