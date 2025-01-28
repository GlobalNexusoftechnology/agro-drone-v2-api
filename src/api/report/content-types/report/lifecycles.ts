
interface PaymentData {
  total_amount?: number;
  paid_amount?: number;
  balance_amount?: number;
  payment_status?: 'Paid' | 'UnPaid';
}

const calculateDependentFields = (data: PaymentData): void => {
  if (data.total_amount !== undefined && data.paid_amount !== undefined) {
    data.balance_amount = data.total_amount - data.paid_amount;
    
    if (data.balance_amount === 0) {
      data.payment_status = 'Paid';
    } else {
      data.payment_status = 'UnPaid';
    }
  }
};

export default {
  beforeCreate(event: { params: { data: PaymentData } }) {
    const { data } = event.params;
    calculateDependentFields(data);
  },
  
  beforeUpdate(event: { params: { data: PaymentData } }) {
    const { data } = event.params;
    calculateDependentFields(data);
  }
};