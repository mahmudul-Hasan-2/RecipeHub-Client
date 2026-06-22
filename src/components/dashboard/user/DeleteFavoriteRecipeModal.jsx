"use client";

import React, { useState } from "react";
import { Modal, Button } from "@heroui/react";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { deleteFavouriteRecipe } from "@/lib/actions/Favourites";

const DeleteFavoriteRecipeModal = ({ favoriteId, recipeName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await deleteFavouriteRecipe(favoriteId);
      if (res?.deletedCount > 0) {
        toast.success("Removed from favorites!");
        setIsOpen(false);
        router.refresh();
      } else {
        toast.error("Failed to remove");
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        isIconOnly
        variant="flat"
        color="danger"
        size="sm"
        onClick={() => setIsOpen(true)}
      >
        <Trash2 size={16} />
      </Button>

      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <Modal.Backdrop>
          <Modal.Container>
            <Modal.Dialog>
              <Modal.CloseTrigger />
              <Modal.Header>
                <Modal.Heading>Remove Favorite?</Modal.Heading>
              </Modal.Header>
              <Modal.Body>
                <p>
                  Are you sure you want to remove <strong>{recipeName}</strong>{" "}
                  from your favorites list? This action cannot be undone.
                </p>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="flat" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button
                  color="danger"
                  isLoading={loading}
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
};

export default DeleteFavoriteRecipeModal;
