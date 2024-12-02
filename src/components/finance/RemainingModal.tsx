import React from "react";
import { Badge, Text } from "@mantine/core";

type Finance = {
  id: string;
  reason: string;
  amount: number;
  type: string;
  payment_method: string;
  bank_name?: string;
  date: string;
};

type RemainingMoneyModalProps = {
  data: Finance[];
};

const RemainingMoneyModal: React.FC<RemainingMoneyModalProps> = ({ data }) => {
  return (
    <div className="p-6 bg-white rounded shadow-lg">
      {data.length > 0 ? (
        <ul>
          {data.map((item) => (
            <>
              <div key={item.id} className="mb-4">
                <h2 className="text-xl font-bold mb-4 text-black">
                  Remaining Money
                </h2>
                <Text size="sm" className="text-gray-600">
                  Type:
                  {item.type}
                </Text>
                <Text size="sm" className="text-gray-500">
                  Payment Method: {item.payment_method}
                </Text>
                {item.bank_name && (
                  <Text size="sm" className="text-gray-500">
                    Bank: {item.bank_name}
                  </Text>
                )}
              </div>

              <div className="flex justify-between items-center">
                <Text size="xl" className="text-green-600">
                  Amount: {item.amount}
                </Text>
                <Badge color="light" className="text-xs">
                  {item.date}
                </Badge>
              </div>
            </>
          ))}
        </ul>
      ) : (
        <p className="text-red-500">No remaining finances found.</p>
      )}
    </div>
  );
};

export default RemainingMoneyModal;