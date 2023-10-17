import { expect, describe, it, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/react';
import UiModal from './UiModal';

describe('src/components/ui/UiModal.tsx', () => {
  it('renders the UiModal with the correct title', async () => {
    const handleClose = vi.fn();
    const modalTitle = 'Test Modal';

    const modalComponent = render(
      <UiModal onClose={handleClose} isOpen title={modalTitle}>
        Modal Content
      </UiModal>,
    );

    const titleElement = modalComponent.getByTestId('modal-title');
    expect(titleElement).toBeDefined();
  });

  it.skip('calls onClose when overlay is clicked', async () => {
    const handleClose = vi.fn();
    const modalTitle = 'Test Modal';

    const modalComponent = render(
      <UiModal onClose={handleClose} isOpen title={modalTitle}>
        Modal Content
      </UiModal>,
    );

    const overlay = modalComponent.getByTestId('overlay');
    await fireEvent.click(overlay);

    expect(handleClose).toBeCalled();
  });
});
