/**
 * The Recording API controllers
 */

import DataSource from "../../lib/DataSource.js";

export const getRecording = async (req, res, next) => {
  try {
    const { id } = req.params;
    const recordingRepository = DataSource.getRepository("Recording");
    const recording = await recordingRepository.findOneBy({
      id,
    });

    res.status(200).json(recording);
  } catch (e) {
    res.status(500).json({
      status: "Failed to get recording",
    });
  }
};

export const getRecordings = async (req, res, next) => {
  try {
    const recordingRepository = DataSource.getRepository("Recording");
    const recordings = await recordingRepository.find({
      relations: ["categories", "feedbacks"],
    });
    res.status(200).json(recordings);
  } catch (e) {
    res.status(500).json({
      status: "Failed to get recordings",
    });
  }
};
