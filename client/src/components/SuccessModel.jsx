import { motion } from "framer-motion";

const SuccessModal = ({ close }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="bg-white p-8 rounded shadow text-center"
      >
        <h2 className="text-2xl font-bold text-green-600">
          Order Placed Successfully 🎉
        </h2>
        <button
          onClick={close}
          className="mt-4 bg-green-600 text-white px-6 py-2 rounded"
        >
          OK
        </button>
      </motion.div>
    </div>
  );
};

export default SuccessModal;