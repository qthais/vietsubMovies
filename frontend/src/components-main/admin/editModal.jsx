import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";

const EditMovieModal = ({ isOpen, onClose, movie, setMovie, onSave }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-10">
      {/* Backdrop */}
      <DialogBackdrop className="fixed inset-0 bg-gray-500/75 transition-opacity" />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
          <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            {/* Modal Header */}
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                Edit Movie Details
              </DialogTitle>

              {/* Modal Body */}
              <div className="mt-4 space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    value={movie?.title || ""}
                    onChange={(e) => setMovie({ ...movie, title: e.target.value })}
                    className="mt-1 text-black bg-gray-200 px-4 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                {/* Overview */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Overview</label>
                  <textarea
                    value={movie?.overview || ""}
                    onChange={(e) => setMovie({ ...movie, overview: e.target.value })}
                    className="mt-1 text-black bg-gray-200 h-[6rem] px-4 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                {/* Backdrop Path */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Backdrop Path</label>
                  <input
                    type="text"
                    value={movie?.backdrop_path || ""}
                    onChange={(e) => setMovie({ ...movie, backdrop_path: e.target.value })}
                    className="mt-1 text-black bg-gray-200 px-4 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                {/* Poster Path */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Poster Path</label>
                  <input
                    type="text"
                    value={movie?.poster_path || ""}
                    onChange={(e) => setMovie({ ...movie, poster_path: e.target.value })}
                    className="mt-1 text-black bg-gray-200 px-4 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                {/* Runtime */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Runtime</label>
                  <input
                    type="number"
                    value={movie?.runtime || ""}
                    onChange={(e) => setMovie({ ...movie, runtime: e.target.value })}
                    className="mt-1 text-black bg-gray-200 px-4 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={() => onSave(movie._id)}
                className="inline-flex justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={onClose}
                className="mt-3 inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default EditMovieModal;
