import { useState, useCallback } from "react";

export const useModal = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalContent, setModalContent] = useState(null);

	return {
		isModalOpen,
		modalContent,
		openModal: useCallback((content) => {
			setIsModalOpen(true);
			setModalContent(content);
		}, []),
		closeModal: useCallback(() => {
			setIsModalOpen(false);
			setModalContent(null);
		}, []),
	};
};
